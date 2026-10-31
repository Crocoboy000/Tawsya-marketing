'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { motionCurves } from './tokens';

gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, SplitText, DrawSVGPlugin);

for (const [name, curve] of Object.entries(motionCurves)) {
  CustomEase.create(name, curve);
}

export { gsap, useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin };
