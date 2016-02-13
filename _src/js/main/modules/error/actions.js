export function errorAction(status, message) {
    return {
        type: 'ERROR',
        status,
        message
    };
}