import {HttpResponse} from '@angular/common/http';
import {Error} from '../services/user.service';

export const handleResponse = (response: HttpResponse<any>) => {
  if (response.status === 200) {
    return response.body && (response.body as any).data as any;
  }
  if (response.status === 500) {
    return {
      type: 'Error',
      errorMessage: response.body && (response.body as any).errorMessage
    } as Error;
  }
  return {
    type: 'Error',
    errorMessage: 'server error. contact support'
  } as Error;
};
