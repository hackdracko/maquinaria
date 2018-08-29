/**
 * Created by Artziel Narvaiza on 21/12/2016.
 */
import { trigger, state, style, animate, transition } from '@angular/animations';

export class SlideAnimation {

    public static trigger(speed: number, width: number){
        return trigger ('SlideTransition', [
            state('in', style({ right: 0 })),
            state('out', style({ right: -(width) })),
            transition('out => in', [
                style({ right: -(width) }),
                animate (speed, style({ right: 0 }))
            ]),
            transition('in => out', [
                style({ right: 0 }),
                animate (speed, style({ right: -(width) }))
            ]),
        ]);
    };
}
