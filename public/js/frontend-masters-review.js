import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import toggleNav from './modules/nav';
import typeAhead from './modules/typeAhead';


// toggleNav($('#nav'), $('#toggleButton'), $('#backdrop'));
toggleNav($('#nav'), $$('.toggleNav'));

typeAhead($('.search'));