import { NgModule } from "@angular/core";
import { SafePipe } from './custom.pipe';

@NgModule({
    declarations:[SafePipe],
    exports:[SafePipe],
    providers:[SafePipe]
})

export class PipeModule {}