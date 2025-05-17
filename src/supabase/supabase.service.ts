import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  createClient() {
    let supabaseUrl = 'https://osinraajqvksoggeoeja.supabase.co';
    let supabaseKey = process.env.SUPABASE_KEY!;

    let supabase = createClient(supabaseUrl, supabaseKey!);
    return supabase;
  }
}
