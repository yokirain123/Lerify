import React from 'react';
import Modal from './Modal';
import useUploadModal from '@/hooks/useUploadModal';

const UploadModal = () => {
    const uploadModal = useUploadModal();

    // Handle modal state changes
    const onChange = (open: boolean) => {
        if (!open) {
            uploadModal.onClose();
        }
        console.log('uploadModal.isOpen');

    }

    return (
        <Modal 
            title="Upload modal title"
            description="Upload modal description"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            Upload content
        </Modal>
        
    );
}

export default UploadModal;
