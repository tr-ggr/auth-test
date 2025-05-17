import { Injectable } from '@nestjs/common';
import { MessageDTO } from './dto/message.dto';

@Injectable()
export class MessageService {
  async sendMessage(messageDTO: MessageDTO) {}
}
