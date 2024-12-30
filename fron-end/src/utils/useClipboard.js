import { useToast } from 'primevue/usetoast';

export function useClipboard() {
    const toast = useToast();

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(
            () => {
                toast.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Link copied!',
                    life: 3000
                });
            },
            (err) => {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to copy link.',
                    life: 3000
                });
                console.error('Error: ', err);
            }
        );
    };

    return { copyToClipboard };
}
