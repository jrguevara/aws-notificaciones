import { SES } from '@aws-sdk/client-ses';

const ses = new SES({ region: 'us-east-1' });

async function enviarEmail(event, context) {
    const record = event.Records[0];
    console.log('procesando registro', record);

    const email = JSON.parse(record.body);

    const { subject, body, recipient } = email;

    const params = {
        Source: 'jr.guevara@outlook.com',
        Destination: {
            ToAddresses: [recipient],
        },
        Message: {
            Body: {
                Text: {
                    Data: body,
                },
            },
            Subject: {
                Data: subject,
            },
        },
    };

    try {
        const result = await ses.sendEmail(params);
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
}

export const handler = enviarEmail;