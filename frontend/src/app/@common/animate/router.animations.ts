/**
 * Created by Artziel Narvaiza on 21/12/2016.
 */
import { trigger, style, animate, transition } from '@angular/animations';

export class RouterAnimations {
    public static fadeIn = trigger ('routerFadeInTransition', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate (300, style({ opacity: 1 }))
        ]),
    ]);
}
