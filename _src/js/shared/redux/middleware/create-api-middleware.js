import { batchActions } from 'redux-batched-actions';
import { errorAction } from '../../modules/app/actions.js';

export const CALL_API = 'CALL_API';
export const ASYNC_ERROR = 'ASYNC_ERROR';
export const ASYNC_PENDING = 'ASYNC_PENDING';
export const ASYNC_SUCCESS = 'ASYNC_SUCESS';

export default api => store => next => action => {
    if (action.type !== CALL_API) {
        return next(batchActions([action, errorAction(false)]));
    }

    let method = action.method === 'POST' ? 'POST' : 'GET';

    next(batchActions([
        { type: action.types.fetchingType },
        { type: ASYNC_PENDING }
    ]));

    let request = Object.assign(
        {},
        action.payload || {},
        { lang: action.lang || store.getState().meta.currentLanguage }
    );

    return api(action.endpoint, request || {}, method)
        .then(data => {
            return next(batchActions([
                {
                    type: action.types.fetchedType,
                    data
                },
                { type: ASYNC_SUCCESS },
                errorAction(false)
            ]));
        })
        .catch(error => {
            next(errorAction(error))
        });

}

