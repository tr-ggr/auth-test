import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { UserAuth } from './dto/user-auth.dto';
import { ProfileDTO } from './dto/profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  supabaseUrl = 'https://osinraajqvksoggeoeja.supabase.co';
  supabaseKey = process.env.SUPABASE_KEY!;

  supabase = createClient(this.supabaseUrl, this.supabaseKey!);

  async login(userAuth: UserAuth) {
    let { data, error } = await this.supabase.auth.signInWithPassword({
      email: userAuth.email,
      password: userAuth.password,
    });

    if (error) {
      return error;
    }

    let profile = await this.supabase
      .from('profiles')
      .select('id')
      .eq('id', data.user?.id);

    if (profile.data?.length != 0) {
      return profile;
    }

    return { message: 'first time login', data };
  }

  async signup(userAuth: UserAuth) {
    console.log(userAuth);

    let { data, error } = await this.supabase.auth.signUp({
      email: userAuth.email,
      password: userAuth.password,
    });

    if (error) {
      return error;
    }

    return data;
  }

  async logout() {
    let { error } = await this.supabase.auth.signOut();

    if (error) {
      return error;
    }
    return 'Logged out successfully!';
  }

  async getProfile() {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();

    if (user) {
      return user;
    }

    return "You're not logged in!";
  }

  async updateProfile(updateProfile: UpdateProfileDTO) {
    const {
      data: { user },
    } = await this.supabase.auth.getUser();

    let profile = await this.supabase.from('profiles').select();

    console.log(profile);

    if (!profile) {
      console.log('No Profile');
      const data = await this.supabase.from('profiles').insert({
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
      data = await this.supabase
        .from('profiles')
        .update({
          username: updateProfile.username,
        })
        .eq('id', user?.id);
    } else {
      data = await this.supabase
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
