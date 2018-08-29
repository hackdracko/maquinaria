/**
 * Created by Artziel Narvaiza on 21/12/2016.
 */
import { trigger, state, style, animate, transition } from '@angular/animations';

export class FadeInAnimation {
    public static trigger = trigger ('FadeInTransition', [
        state('shown', style({ display: 'inherit' })),
        state('hidden', style({ display: 'none' })),
        transition('hidden => shown', [
            style({ opacity: 0 }),
            animate (300, style({ opacity: 1 }))
        ]),
    ]);
}
