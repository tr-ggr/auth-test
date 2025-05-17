import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { UserAuth } from './dto/user-auth.dto';
import { ProfileDTO } from './dto/profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async login(userAuth: UserAuth) {
    let supabase = this.supabaseService.createClient();

    let { data, error } = await supabase.auth.signInWithPassword({
      email: userAuth.email,
      password: userAuth.password,
    });

    if (error) {
      return error;
    }

    let profile = await supabase
      .from('profiles')
      .select()
      .eq('id', data.user?.id);

    if (profile.data?.length != 0) {
      return { data, profile };
    }

    return { message: 'first time login', data };
  }

  async signup(userAuth: UserAuth) {
    let supabase = this.supabaseService.createClient();

    console.log(userAuth);

    let { data, error } = await supabase.auth.signUp({
      email: userAuth.email,
      password: userAuth.password,
    });

    if (error) {
      return error;
    }

    return data;
  }

  async logout() {
    let supabase = this.supabaseService.createClient();

    let { error } = await supabase.auth.signOut();

    if (error) {
      return error;
    }
    return 'Logged out successfully!';
  }

  async getProfile() {
    let supabase = this.supabaseService.createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return user;
    }

    return "You're not logged in!";
  }

  async updateProfile(updateProfile: UpdateProfileDTO) {
    let supabase = this.supabaseService.createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    let profile = await supabase.from('profiles').select();

    console.log(profile);

    if (!profile) {
      console.log('No Profile');
      const data = await supabase.from('profiles').insert({
        id: user?.id,
        username: updateProfile.username,
      });

      if (data.error) {
        return data;
      }

      return data;
    }

    console.log('Have Profile');

    let data: any = null;

    if (updateProfile.isAnonymous == undefined) {
      data = await supabase
        .from('profiles')
        .update({
          username: updateProfile.username,
        })
        .eq('id', user?.id);
    } else {
      data = await supabase
        .from('profiles')
        .update({
          username: updateProfile.username,
          is_anonymous: updateProfile.isAnonymous,
        })
        .eq('id', user?.id);
    }

    if (data.error) {
      return data;
    }

    return data;
  }
}
