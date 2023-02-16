import { ApiGatewayManagementApi } from 'aws-sdk';
import { injectable } from 'inversify';

const ENDPOOINT =
  'y5d0j3moc7.execute-api.ap-northeast-1.amazonaws.com/production';
/**
 * Service class for chat
 */
@injectable()
export class ChatService {
  private async sendMessage(id: string, message: string) {
    try {
      const client = new ApiGatewayManagementApi({ endpoint: ENDPOOINT });

      await client
        .postToConnection({
          ConnectionId: id,
          Data: Buffer.from(message),
        })
        .promise();
    } catch (err) {
      console.log(err);
    }
  }

  public async connect(connectionId: string) {
    await this.sendMessage(
      connectionId,
      `connected, your ID is ${connectionId} `
    );
  }

  public async disconnect(connectionId: string) {
    await this.sendMessage(connectionId, 'disconnect...');
  }

  public async default(connectionId: string) {
    await this.sendMessage(connectionId, `your ID is ${connectionId}`);
  }

  public async private(body: any) {
    // const body = JSON.parse(event.body);
    const targetId = body.target;
    const message = body.message;
    await this.sendMessage(targetId, message);
  }
}
