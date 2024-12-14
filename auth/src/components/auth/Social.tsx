"use client";

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const Social = () => {

  const login = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className='w-full flex items-center gap-x-2'>
      <Button size={'lg'} variant={'outline'} className='w-full' onClick={() => login("google")}>
        <FcGoogle className='h-5 w-5'/>
      </Button>
      <Button size={'lg'} variant={'outline'} className='w-full' onClick={() => login("github")}>
        <FaGithub className='h-5 w-5'/>
      </Button>
    </div>
  );
}

/**
 * Problem:
 * During the implementation of Google OAuth sign-in using NextAuth, the login process failed,
 * and the following error was encountered:
 * 
 * Error:
 * - CallbackRouteError: fetch failed
 * - ENOTFOUND: Could not resolve the hostname 'oauth2.googleapis.com'
 * 
 * Diagnosis:
 * - The issue occurred because the DNS server being used could not resolve the domain 
 *   `oauth2.googleapis.com`, which is essential for the Google OAuth flow.
 * - Running `nslookup oauth2.googleapis.com` revealed the DNS server was returning a 
 *   "Non-existent domain" error, indicating the DNS server was unreliable.
 * 
 * Solution:
 * - The problem was resolved by switching to a reliable DNS provider, such as Google DNS.
 * - Steps followed:
 *   1. Changed the DNS server to Google DNS (8.8.8.8 and 8.8.4.4) or Cloudflare DNS 
 *      (1.1.1.1 and 1.0.0.1).
 *   2. Flushed the local DNS cache to apply the changes:
 *      - Linux: `sudo systemd-resolve --flush-caches`
 *      - Windows: `ipconfig /flushdns`
 *   3. Verified the domain resolution using:
 *      `nslookup oauth2.googleapis.com`
 *   4. Restarted the application and the Google OAuth login worked successfully.
 */