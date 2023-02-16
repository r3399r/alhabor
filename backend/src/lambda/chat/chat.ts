import { bindings } from 'src/bindings';
import { ChatService } from 'src/logic/ChatService';

export async function chat(event: any, context: any) {
  console.log(event, context);
  try {
    let service: ChatService | null = null;
    const routeKey = event.requestContext.routeKey;
    const connectionId = event.requestContext.connectionId;

    service = bindings.get(ChatService);

    switch (routeKey) {
      case '$connect':
        console.log('is connect');
        // users.push(connectionId)
        await service.connect(connectionId);
        break;
      case '$disconnect':
        console.log('is disconnect');
        // users.filter((v => v !== connectionId))
        await service.disconnect(connectionId);
        break;
      case '$default':
        console.log('is default');
        await service.default(connectionId);
        break;
      case 'chat-private':
        console.log('private');
        await service.private(JSON.parse(event.body));
        break;
      case 'chat-public':
        // const body2 = JSON.parse(event.body);
        // const message2 = body2.message;
        console.log('public');
        // await Promise.all(users.map(async v => await sendMessage(v, message2)))
        break;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from Lambda!'),
    };

    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify('fail'),
    };
  }
}
