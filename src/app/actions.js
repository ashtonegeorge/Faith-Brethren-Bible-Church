'use server';
import { revalidatePath } from 'next/cache';

// get the sendgrid transactional api module
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

// send an email to the church email address with the prayer request
export async function sendPrayerRequest(formData) {
  const name = formData.get('name');
  const prayerRequest = formData.get('prayerRequest');

  const msg = {
    to: 'ashtongeorge17@gmail.com',
    from: 'ashtonsmail@icloud.com',
    subject: 'Incoming Prayer Request for ' + name,
    text: `Name: ${name}\nPrayer Request: ${prayerRequest}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #4F81BD;">Incoming Prayer Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Prayer Request:</strong></p>
        <p style="margin-left: 20px;">${prayerRequest}</p>
      </div>
    `,
  }

  try {
    await sgMail.send(msg)
    revalidatePath('/connect')
    console.log("Email sent successfully")
  } catch (error) {
    console.error(error)
    console.log("Error sending email")
  }
}