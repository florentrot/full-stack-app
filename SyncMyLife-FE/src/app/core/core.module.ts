import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AuthGuard } from "./guard/auth.guard";
import { HeaderInterceptor } from './interceptor/header.interceptor';
import { throwIfAlreadyLoaded } from "./guard/module-import.guard";

@NgModule({
  declarations: [],
  imports: [ HttpClientModule ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}
