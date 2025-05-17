import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message/message.module';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), MessageModule, SupabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
