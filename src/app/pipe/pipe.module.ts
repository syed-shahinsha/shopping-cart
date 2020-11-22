import { NgModule } from "@angular/core";
import { SafePipe, UsernamePipe } from './custom.pipe';

@NgModule({
    declarations:[SafePipe, UsernamePipe],
    exports:[SafePipe, UsernamePipe],
    providers:[SafePipe, UsernamePipe]
})

export class PipeModule {}