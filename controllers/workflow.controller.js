import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs'


const REMINDERS = [7, 5, 2, 1]

export const sendReminders = serve(async(context) =>{
    //get sub id
    const {subscriptionId} = context.requestPayload;
    //fetch sub by id
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
      }

      //loop through the reminder array numbers
      for(const daysBefore of REMINDERS){
        //subtract each reminder numbers
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        //if reminer date is before the current day and time
        if(reminderDate.isAfter(dayjs())){
            //put to sleep
            await sleepUntillReminder(context,  `Reminder ${daysBefore} days before`, reminderDate);
        }
        if (dayjs().isSame(reminderDate, 'day')) {
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
          }
      }
});

//fetch subscription
const fetchSubscription = async(context, subscriptionId) =>{
    return await context.run('get subscription', async () => {
        return Subscription.findById(subscriptionId).populate( 'user', 'name email');
      })
}

//sleep function
const sleepUntillReminder = async(context, label, date)=>{
    console.log(`Sleeping untill ${label} reminder at ${date}`);
    await context.sleepUntill(label, date.toDate());
}

//func to trigger reminder
const triggerReminder = async(context, label)=>{
    await context.run(label, ()=>{
        console.log(`triggering ${label} reminder`);
        //send email, sms, push notification
    })
}