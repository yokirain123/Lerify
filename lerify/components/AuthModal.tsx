"use client"

import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import Modal from './Modal';
import { useRouter } from 'next/navigation';

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext(); 
    return (
        <Modal title='welcome back' description='login to your acc' isOpen onChange={() => {}}>
            Auth modal children
        </Modal>
    );
}

export default AuthModal;
