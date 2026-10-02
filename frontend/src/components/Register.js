import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../utils/firebase';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const handleOAuthLogin = async (providerName) => {
    try {
      const provider = providerName === 'google' ? googleProvider : githubProvider;
      const result = await signInWithPopup(auth, provider);
      
      const email = result.user.email;
      const name = result.user.displayName || email.split('@')[0];
      
      const response = await fetch('http://localhost:9005/auth/oauth-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, provider: providerName })
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/dashboard';
      } else {
        const text = await response.text();
        alert(`${providerName} registration failed: ` + text);
      }
    } catch (error) {
      if (error.code === 'auth/invalid-api-key') {
        alert("Please configure your Firebase API keys in src/utils/firebase.js to use real Google/GitHub authentication!");
      } else if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
        alert('Authentication Error: ' + error.message);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-fullname').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
      const response = await fetch('http://localhost:9005/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: name,
          email: email, 
          firstPassword: password, 
          confirmPassword: password,
          role: 'PROJECT_MANAGER'
        })
      });

      const text = await response.text();
      if (response.ok) {
        alert('Registration successful');
        window.location.href = '/login';
      } else {
        alert('Registration failed: ' + text);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };


  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen relative dark">
      <header className="fixed top-0 left-0 w-full z-50 pointer-events-none p-margin"><div className="flex items-center justify-between pointer-events-auto"><div className="flex items-center gap-space-sm"><div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><span className="material-symbols-outlined text-primary text-headline-sm">terminal</span></div><span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">TaskFlow</span></div><nav className="flex items-center gap-space-lg" data-active-classes="text-on-surface"><Link to="/login" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">Sign In</Link><Link to="/register" className="font-label-md transition-colors text-on-surface">Register</Link></nav></div></header>
      <main className="w-full min-h-screen bg-background relative flex flex-col justify-center">
        <div className="flex flex-col w-full relative min-h-screen overflow-hidden">
{/*  Living Full-Screen Environment Backdrop  */}
<div className="fixed inset-0 w-full h-full pointer-events-none z-0">
{/*  Living Video Background for Animated Typists, Screens, Clouds and Aurora  */}
<video autoPlay loop muted playsInline className="w-full h-full object-cover object-center select-none" poster="/bg_highres.jpg">
  <source src="/coding-hackers.mp4" type="video/mp4" />
</video>
{/*  Sky Layer: Aurora Borealis, Twinkling Stars & Drifting Night Clouds  */}
<div className="absolute top-0 right-0 w-3/5 h-1/2 overflow-hidden pointer-events-none opacity-90">
{/*  Twinkling Micro Stars  */}
<svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
<circle className="star-fast" cx="24%" cy="28%" fill="#ffffff" r="1.5" />
<circle className="star-mid" cx="38%" cy="16%" fill="#acedff" r="2" />
<circle className="star-slow" cx="55%" cy="32%" fill="#adc6ff" r="1" />
<circle className="star-fast" cx="72%" cy="14%" fill="#ffffff" r="1.8" />
<circle className="star-mid" cx="85%" cy="24%" fill="#4cd7f6" r="1.2" />
<circle className="star-slow" cx="48%" cy="20%" fill="#d8e2ff" r="1" />
<circle className="star-fast" cx="64%" cy="8%" fill="#ffffff" r="2.2" />
<circle className="star-mid" cx="79%" cy="35%" fill="#acedff" r="1.4" />
</svg>
{/*  Aurora Wave 1: Cyan/Emerald Veil  */}
<div className="aurora-layer-1 absolute -top-12 right-0 w-[120%] h-64 bg-gradient-to-r from-transparent via-tertiary/25 to-transparent blur-3xl mix-blend-screen pointer-events-none"></div>
{/*  Aurora Wave 2: Deep Lapis/Teal Sheen  */}
<div className="aurora-layer-2 absolute -top-4 right-1/4 w-[90%] h-56 bg-gradient-to-r from-transparent via-primary-container/20 to-transparent blur-2xl mix-blend-screen pointer-events-none"></div>
{/*  Drifting Night Clouds  */}
<div className="nebula-glow absolute top-10 right-10 w-3/4 h-48 bg-gradient-to-bl from-surface-tint/10 via-transparent to-transparent blur-2xl pointer-events-none"></div>
</div>
{/*  Interactive Holographic Radar & Data Overlays on Large Window  */}
<div className="absolute top-[8%] right-[32%] w-72 h-80 pointer-events-none hidden lg:block opacity-85">
<div className="relative w-full h-full flex items-center justify-center">
{/*  Rotating Holographic Radar Ring  */}
<div className="absolute inset-4 rounded-full border border-tertiary/30 animate-[radarOrbit_16s_linear_infinite]">
<div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-tertiary shadow-[0_0_8px_#4cd7f6]"></div>
</div>
<div className="absolute inset-12 rounded-full border border-primary/25 border-dashed animate-[radarOrbitRev_22s_linear_infinite]"></div>
{/*  Center Pulsing Telemetry Crosshair  */}
<div className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed shadow-[0_0_10px_#4cd7f6]"></div>
{/*  Live SVG Waveform Chart Overlay  */}
<svg className="absolute bottom-6 left-6 right-6 h-10 w-5/6" fill="none" viewBox="0 0 100 30">
<path className="animate-[waveformPulse_4s_linear_infinite]" d="M0,20 Q15,5 30,18 T60,10 T90,24 L100,15" fill="none" stroke="#4cd7f6" strokeDasharray="6,3" strokeWidth="1.5" />
</svg>
{/*  Dynamic Hex Stream & Coordinates  */}
<div className="absolute top-2 right-4 font-mono text-[9px] text-tertiary-fixed tracking-widest opacity-80 select-none">
          SEC // 0x48F2 • LIVE
        </div>
<div className="absolute bottom-2 left-6 font-mono text-[8px] text-primary/70 tracking-widest select-none">
          BEAM AZIMUTH: 184.2° OK
        </div>
</div>
</div>
{/*  Living Operators: Subtle Micro-Movements & Typing Reflections  */}
{/*  Console 1 (Foreground Lead Operator)  */}
<div className="absolute bottom-[10%] left-[16%] w-48 h-48 pointer-events-none hidden xl:block">
{/*  Ambient Typing Surface Glow  */}
<div className="absolute bottom-10 left-12 w-16 h-8 bg-tertiary/20 rounded-full blur-md animate-[workerTyping_1.8s_ease-in-out_infinite]"></div>
{/*  Subtle Head Angle Shift Tracker  */}
<div className="absolute top-8 left-16 w-8 h-8 rounded-full bg-surface-container-highest/10 animate-[operatorHeadGentle_6s_ease-in-out_infinite]"></div>
</div>
{/*  Console 2 & 3 (Midground Telemetry Engineers)  */}
<div className="absolute bottom-[22%] left-[48%] w-36 h-28 pointer-events-none hidden xl:block">
<div className="absolute bottom-4 left-6 w-12 h-6 bg-primary/20 rounded-full blur-md animate-[workerTyping_2.3s_ease-in-out_infinite]"></div>
<div className="absolute top-2 left-8 w-6 h-6 rounded-full bg-surface-container-highest/10 animate-[operatorLean_8s_ease-in-out_infinite]"></div>
</div>
{/*  Screen Glow Pulsing Accent in Control Bay  */}
<div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-t from-surface-container-lowest/80 via-surface/40 to-transparent pointer-events-none"></div>
</div>
{/*  Foreground Application Layout  */}
<div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-margin py-space-xl">
{/*  Top System Telemetry & Certification Ribbon  */}
<div className="w-full flex items-center justify-between pt-space-lg mb-space-xl">
<div className="flex items-center gap-space-md">
{/*  Live Telemetry Online Indicator  */}
<div className="flex items-center gap-space-xs px-space-md py-1 bg-surface-container-low/90 backdrop-blur-md rounded-full shadow-sm">
<span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#4cd7f6] animate-pulse"></span>
<span className="font-label-sm text-label-sm text-tertiary-fixed tracking-wider">TELEMETRY ONLINE</span>
</div>
{/*  SOC-2 Compliance Badge  */}
<div className="hidden sm:flex items-center gap-space-xs px-space-md py-1 bg-surface-container-low/85 backdrop-blur-md rounded-full shadow-sm">
<span className="material-symbols-outlined text-primary text-[14px]">verified_user</span>
<span className="font-label-sm text-label-sm text-on-surface-variant tracking-normal">SOC-2 Type II Certified</span>
</div>
</div>
{/*  Environment Micro Meta  */}
<div className="hidden md:flex items-center gap-space-sm font-mono text-[11px] text-outline">
<span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
<span>CLUSTER: AP-EAST-01</span>
<span className="text-surface-variant">/</span>
<span className="text-tertiary">LATENCY: 12ms</span>
</div>
</div>
{/*  Main Workspace Split: Left Registration Glass Card & Right Open Horizon  */}
<div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center my-auto pb-space-lg">
{/*  LEFT REGISTRATION COMPONENT (440px - 500px on desktop)  */}
<div className="lg:col-span-6 xl:col-span-5 w-full max-w-[500px]">
<div className="bg-surface-container-low/85 backdrop-blur-2xl rounded-full p-space-xl shadow-2xl relative overflow-hidden">
{/*  Subtle Top Specular Sheen  */}
<div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
{/*  Header Tag  */}
<div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-secondary-container/30 text-secondary mb-space-md">
<span className="material-symbols-outlined text-sm text-secondary-fixed">bolt</span>
<span className="font-label-sm text-label-sm tracking-wider uppercase font-semibold">Next-Gen Pipeline Orchestration</span>
</div>
{/*  Title & Subtitle  */}
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold mb-space-xs">
            Create your TaskFlow account
          </h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg leading-relaxed">
            Start your 14-day enterprise trial. No credit card required. Instant cluster provisioning.
          </p>
{/*  OAuth Social Providers  */}
<div className="grid grid-cols-2 gap-space-sm mb-space-md">
<button onClick={() => handleOAuthLogin('google')} className="group flex items-center justify-center gap-space-sm py-2 px-space-md rounded-lg bg-surface-container-high/70 hover:bg-surface-container-highest transition-colors shadow-sm" type="button">
<svg className="w-4 h-4" viewBox="0 0 24 24">
<path d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335" />
<path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4" />
<path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.1-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9c-.2-.7-.4-1.5-.4-2.4z" fill="#FBBC05" />
<path d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z" fill="#34A853" />
</svg>
<span className="font-label-md text-label-md text-on-surface">Google</span>
</button>
<button onClick={() => handleOAuthLogin('github')} className="group flex items-center justify-center gap-space-sm py-2 px-space-md rounded-lg bg-surface-container-high/70 hover:bg-surface-container-highest transition-colors shadow-sm" type="button">
<svg className="w-4 h-4 fill-on-surface" viewBox="0 0 24 24">
<path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd" />
</svg>
<span className="font-label-md text-label-md text-on-surface">GitHub</span>
</button>
</div>
{/*  Divider  */}
<div className="relative flex items-center justify-center my-space-md">
<div className="w-full h-[1px] bg-surface-variant"></div>
<span className="absolute px-space-sm bg-surface-container-low font-label-sm text-label-sm text-outline tracking-wider uppercase text-[10px]">
              Or register with work email
            </span>
</div>
{/*  Registration Form Fields  */}
<form className="space-y-space-md" onSubmit={handleRegister}>
{/*  Row 1: Full Name & Work Email  */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<div className="flex flex-col gap-1">
<label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-fullname">Full Name</label>
<div className="relative flex items-center bg-surface-container-lowest/80 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-outline text-[18px] ml-space-sm pointer-events-none">person</span>
<input className="w-full bg-transparent px-space-sm py-2 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:text-tertiary transition-colors" id="reg-fullname" placeholder="Jane Doe" type="text" defaultValue="Priya Sharma"/>
</div>
</div>
<div className="flex flex-col gap-1">
<label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-email">Work Email</label>
<div className="relative flex items-center bg-surface-container-lowest/80 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-outline text-[18px] ml-space-sm pointer-events-none">mail</span>
<input className="w-full bg-transparent px-space-sm py-2 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:text-tertiary transition-colors" id="reg-email" placeholder="name@company.com" type="email" defaultValue="priya@company.com"/>
</div>
</div>
</div>
{/*  Row 2: Company Name & Team Size  */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<div className="flex flex-col gap-1">
<label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-company">Company Name</label>
<div className="relative flex items-center bg-surface-container-lowest/80 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-outline text-[18px] ml-space-sm pointer-events-none">domain</span>
<input className="w-full bg-transparent px-space-sm py-2 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:text-tertiary transition-colors" id="reg-company" placeholder="Acme Corp" type="text" defaultValue="Acme Cloud Corp"/>
</div>
</div>
<div className="flex flex-col gap-1">
<label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-teamsize">Engineering Team Size</label>
<div className="relative flex items-center bg-surface-container-lowest/80 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-outline text-[18px] ml-space-sm pointer-events-none">groups</span>
<select className="w-full bg-transparent px-space-sm py-2 font-body-md text-body-md text-on-surface focus:outline-none cursor-pointer appearance-none" id="reg-teamsize" defaultValue="10-50">
<option className="bg-surface-container-high text-on-surface" value="1-9">1 - 9 Engineers</option>
<option className="bg-surface-container-high text-on-surface" value="10-50">10 - 50 Engineers</option>
<option className="bg-surface-container-high text-on-surface" value="51-200">51 - 200 Engineers</option>
<option className="bg-surface-container-high text-on-surface" value="200+">200+ Engineers</option>
</select>
<span className="material-symbols-outlined text-outline text-[18px] mr-space-sm pointer-events-none">expand_more</span>
</div>
</div>
</div>
{/*  Password Field with Security Gauge  */}
<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="reg-password">Password</label>
<span className={`font-label-sm text-label-sm font-medium ${
  password.length === 0 ? 'text-outline' :
  (password.length >= 8 && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) ? 'text-tertiary' :
  'text-amber-400'
}`}>
  {password.length === 0 ? 'Enter a password' : 
   (password.length >= 8 && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) ? 'Strong password' : 
   'Weak password'}
</span>
</div>
<div className="relative flex items-center bg-surface-container-lowest/80 rounded-lg shadow-sm">
<span className="material-symbols-outlined text-outline text-[18px] ml-space-sm pointer-events-none">vpn_key</span>
<input className="w-full bg-transparent px-space-sm py-2 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none" id="reg-password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
<button className="mr-space-sm text-outline hover:text-on-surface transition-colors" id="togglePasswordBtn" onClick={() => setShowPassword(!showPassword)} title="Toggle visibility" type="button">
<span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
</button>
</div>
{/*  4-Segment Strength Indicator  */}
<div className="grid grid-cols-4 gap-1.5 mt-1.5">
  {[1, 2, 3, 4].map(num => {
    let score = 0;
    if (password.length > 0) score++;
    if (password.length >= 8) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    
    let colorClass = "bg-surface-container-high";
    if (num <= score) {
      if (score === 1) colorClass = "bg-error shadow-[0_0_6px_#ff5252]";
      else if (score === 2) colorClass = "bg-amber-400 shadow-[0_0_6px_#fbbf24]";
      else if (score === 3) colorClass = "bg-emerald-400 shadow-[0_0_6px_#34d399]";
      else colorClass = "bg-tertiary shadow-[0_0_6px_#4cd7f6]";
    }
    return <div key={num} className={`h-1 rounded-full transition-all duration-300 ${colorClass}`}></div>;
  })}
</div>
{/*  Password Criteria Checklist  */}
<div className="flex flex-wrap items-center gap-x-space-md gap-y-1 mt-1 font-label-sm text-label-sm text-outline">
<div className={`flex items-center gap-1 transition-colors duration-300 ${password.length >= 8 ? 'text-tertiary' : 'text-outline'}`}>
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span>8+ characters</span>
</div>
<div className={`flex items-center gap-1 transition-colors duration-300 ${/\d/.test(password) ? 'text-tertiary' : 'text-outline'}`}>
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span>1 numeric digit</span>
</div>
<div className={`flex items-center gap-1 transition-colors duration-300 ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-tertiary' : 'text-outline'}`}>
<span className="material-symbols-outlined text-[14px]">check_circle</span>
<span>1 special symbol</span>
</div>
</div>
</div>
{/*  Terms Agreement  */}
<div className="flex items-start gap-space-sm pt-1">
<input defaultChecked className="mt-1 w-4 h-4 rounded bg-surface-container-high text-primary focus:ring-0 cursor-pointer" id="reg-terms" type="checkbox"/>
<label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer select-none leading-tight" htmlFor="reg-terms">
                I agree to the <Link className="text-primary hover:underline" to="/terms">Terms of Service</Link>, <Link className="text-primary hover:underline" to="/privacy">Privacy Policy</Link>, and sovereign <Link className="text-primary hover:underline" to="/security">Security Guidelines</Link>.
              </label>
</div>
{/*  Primary Submission CTA  */}
<button className="w-full py-3 px-space-lg rounded-lg bg-primary-container text-on-primary font-headline-sm text-headline-sm font-semibold flex items-center justify-center gap-space-sm hover:bg-inverse-primary hover:shadow-[0_0_24px_rgba(77,142,255,0.4)] active:scale-[0.99] transition-all duration-200 mt-space-sm shadow-md" type="submit">
<span>Create Enterprise Account</span>
<span className="material-symbols-outlined text-lg">arrow_forward</span>
</button>
{/*  Bottom Redirect Link  */}
<div className="text-center pt-space-xs">
<span className="font-body-sm text-body-sm text-on-surface-variant">Already have an account?</span>
<Link className="font-label-md text-label-md text-primary font-medium hover:text-tertiary hover:underline ml-1" to="/login">
                Log in to TaskFlow
              </Link>
</div>
</form>
</div>
</div>
{/*  RIGHT SIDE: Clear Vista showcasing Tech Campus, Holographic Scopes & Operators  */}
<div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-end items-end pointer-events-none mt-space-xl lg:mt-0">
{/*  Optional Minimal Customer Testimonial Anchor (Bottom-Right)  */}
<div className="pointer-events-auto max-w-sm p-space-md rounded-xl bg-surface-container-low/75 backdrop-blur-xl shadow-xl hidden md:block">
<div className="flex items-center justify-between mb-space-xs">
<div className="flex text-tertiary">
<span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
</div>
<div className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary tracking-wide uppercase">
<span className="material-symbols-outlined text-[13px]">verified</span>
<span>Trusted by 10,000+ Teams</span>
</div>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant italic leading-snug mb-space-sm">
            “TaskFlow accelerated our cross-functional release cadence by 4.2x in the first quarter alone. The architectural visibility is unmatched in modern DevOps.”
          </p>
<div className="flex items-center gap-space-sm">
<div className="w-7 h-7 rounded bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm font-bold text-primary">
              OT
            </div>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold leading-none">David Vance</span>
<span className="font-body-sm text-[11px] text-outline leading-tight">VP of Engineering, Orion Technologies</span>
</div>
</div>
</div>
</div>
</div>
{/*  Bottom Status Bar  */}
<div className="w-full flex flex-col sm:flex-row items-center justify-between text-outline font-label-sm text-label-sm py-space-sm">
<div className="flex items-center gap-space-md mb-2 sm:mb-0">
<span>© 2025 TaskFlow Technologies Inc. Sovereign Node v4.8.2</span>
<span className="hidden md:inline text-surface-variant">•</span>
<span className="hidden md:inline">ISO/IEC 27001 Certified Infrastructure</span>
</div>
<div className="flex items-center gap-space-lg">
<Link className="hover:text-on-surface transition-colors" to="/privacy">Privacy</Link>
<Link className="hover:text-on-surface transition-colors" to="/terms">Terms</Link>
<Link className="hover:text-on-surface transition-colors" to="/status">System Status</Link>
</div>
</div>
</div>

</div>
      </main>
    </div>
  );
};

export default Register;
