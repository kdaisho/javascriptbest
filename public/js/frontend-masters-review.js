import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import toggleNav from './modules/nav';


// toggleNav($('#nav'), $('#toggleButton'), $('#backdrop'));
toggleNav($('#nav'), $$('.toggleNav'));