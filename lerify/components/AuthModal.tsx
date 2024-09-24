"use client"

import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react'
import { SocialLayout, ThemeSupa } from '@supabase/auth-ui-shared';
import { useState } from 'react';

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext(); 

    const radii = ['20px', '40px', '20px'] as const;
    const [borderRadius] = useState(radii[0] as string);
    const [borderRadiusAlt] = useState(radii[1] as string);

    const socialAlignments = ['horizontal', 'vertical'] as const;
    const [socialLayout, setSocialLayout] = useState<SocialLayout>(socialAlignments[0] satisfies SocialLayout);
    return (
        <Modal title='Welcome' description='to the world of endless music.' isOpen onChange={() => {}}>
            <Auth theme='dark' 
            socialLayout={socialLayout} 
            providers={['google', 'apple', 'twitter', 'discord', 'github']} 
            appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                      colors: {
                        brand: '#131313',
                        brandAccent: '#88b4fc',
                      },
                      radii: {
                        inputBorderRadius: borderRadius,
                        borderRadiusButton: borderRadiusAlt,
                        buttonBorderRadius: borderRadius,
                      }
                    },
                  },}} 
            supabaseClient={supabaseClient}/>
        </Modal>
    );
}

export default AuthModal;
