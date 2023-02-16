import { Container } from 'inversify';
import 'reflect-metadata';
import { ChatService } from './logic/ChatService';
import { Database } from './util/Database';

const container: Container = new Container();

container.bind<Database>(Database).toSelf().inSingletonScope();

// bind repeatedly for db entities
// container.bind<Function>(dbEntitiesBindingId).toFunction(BillEntity);
// container.bind<Function>(dbEntitiesBindingId).toFunction(BillShareEntity);

// db access for tables
// container.bind<DbAccess>(DbAccess).toSelf();
// container.bind<BillAccess>(BillAccess).toSelf();

// service
container.bind<ChatService>(ChatService).toSelf();

export { container as bindings };
