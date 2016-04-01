import { batchActions } from 'redux-batched-actions';
import { errorAction } from '../../modules/app/actions.js';

export const CALL_API = 'CALL_API';
export const ASYNC_ERROR = 'ASYNC_ERROR';

export default api => store => next => action => {
    if (action.type !== CALL_API) {
        return next(batchActions([action, errorAction(false)]));
    }

    next({ type: action.types.fetchingType });

    let request = Object.assign(
        {},
        action.payload || {},
        { lang: action.lang || store.getState().meta.currentLanguage }
    );

    return api(action.endpoint, request || {})
        .then(data => {
            return next(batchActions([{
                type: action.types.fetchedType,
                data
            }, errorAction(false)]));
        })
        .catch(error => {
            next(errorAction(error))
        });

}

