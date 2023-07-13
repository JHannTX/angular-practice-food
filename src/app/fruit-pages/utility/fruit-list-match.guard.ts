import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { FRUIT_OPTIONS } from 'src/app/constants/fruit-constants';

export const fruitListMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return FRUIT_OPTIONS.some((type) => type === segments[0].path);
};
