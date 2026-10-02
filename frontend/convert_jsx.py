import re
import os

def convert_to_jsx(html_str):
    # Basic replacements
    html_str = html_str.replace('class="', 'className="')
    html_str = html_str.replace('for="', 'htmlFor="')
    html_str = html_str.replace('viewbox=', 'viewBox=')
    html_str = html_str.replace('clip-rule=', 'clipRule=')
    html_str = html_str.replace('fill-rule=', 'fillRule=')
    html_str = html_str.replace('stroke-linecap=', 'strokeLinecap=')
    html_str = html_str.replace('stroke-dasharray=', 'strokeDasharray=')
    html_str = html_str.replace('stroke-dashoffset=', 'strokeDashoffset=')
    html_str = html_str.replace('stroke-width=', 'strokeWidth=')
    html_str = html_str.replace('preserveaspectratio=', 'preserveAspectRatio=')
    html_str = html_str.replace('pointer-events=', 'pointerEvents=')
    html_str = html_str.replace('autocomplete=', 'autoComplete=')
    html_str = html_str.replace('tabindex=', 'tabIndex=')
    html_str = html_str.replace('onsubmit="event.preventDefault();"', 'onSubmit={(e) => e.preventDefault()}')

    # Replace inline styles: style="animation-duration: 3s;" to style={{animationDuration: '3s'}}
    def style_repl(match):
        style_str = match.group(1)
        # simplistic parsing for style
        parts = [p.strip() for p in style_str.split(';') if p.strip()]
        react_styles = []
        for p in parts:
            if ':' in p:
                k, v = p.split(':', 1)
                k = k.strip()
                v = v.strip()
                # camel case k
                k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
                react_styles.append(f"{k}: '{v}'")
        return 'style={{' + ', '.join(react_styles) + '}}'
    
    html_str = re.sub(r'style="([^"]*)"', style_repl, html_str)

    # Self close img, input, hr, br, path, circle, stop, etc.
    for tag in ['input', 'img', 'br', 'hr', 'path', 'circle', 'stop', 'fegaussianblur', 'femergenode', 'defs', 'lineargradient', 'filter', 'femerge']:
        if tag in ['input', 'img', 'br', 'hr', 'path', 'circle', 'stop', 'fegaussianblur', 'femergenode']:
            # self-close these if not already self-closed
            html_str = re.sub(f'<{tag}([^>]*)></{tag}>', f'<{tag}\\1 />', html_str, flags=re.IGNORECASE)
            html_str = re.sub(f'<{tag}([^>]*?)(?<!/)>', f'<{tag}\\1 />', html_str, flags=re.IGNORECASE)

    # Some svg specific tags need to be CamelCased
    html_str = html_str.replace('<lineargradient', '<linearGradient')
    html_str = html_str.replace('</lineargradient>', '</linearGradient>')
    html_str = html_str.replace('<fegaussianblur', '<feGaussianBlur')
    html_str = html_str.replace('</fegaussianblur>', '</feGaussianBlur>')
    html_str = html_str.replace('<femerge>', '<feMerge>')
    html_str = html_str.replace('</femerge>', '</feMerge>')
    html_str = html_str.replace('<femergenode', '<feMergeNode')
    html_str = html_str.replace('</femergenode>', '</feMergeNode>')

    # Convert comments
    html_str = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', html_str, flags=re.DOTALL)
    
    return html_str

# Login parsing
with open(r'd:\TeamManger\frontend\temp_screens\login.html', 'r', encoding='utf-8') as f:
    login_html = f.read()

# Extract main tag contents
main_match = re.search(r'<main[^>]*>(.*?)</main>', login_html, re.DOTALL)
if main_match:
    login_main = main_match.group(1)
    login_jsx = convert_to_jsx(login_main)

    header_match = re.search(r'<header[^>]*>(.*?)</header>', login_html, re.DOTALL)
    header_jsx = convert_to_jsx(f'<header className="fixed top-0 left-0 w-full z-50 pointer-events-none p-margin">{header_match.group(1)}</header>') if header_match else ''
    
    login_jsx = login_jsx.replace('type="password"', 'type={showPassword ? "text" : "password"}')
    login_jsx = login_jsx.replace('onclick="const p = document.getElementById(\'password\'); const icon = this.querySelector(\'span\'); if (p.type === \'password\') { p.type = \'text\'; icon.textContent = \'visibility_off\'; } else { p.type = \'password\'; icon.textContent = \'visibility\'; }"', 'onClick={() => setShowPassword(!showPassword)}')
    login_jsx = login_jsx.replace('<span className="material-symbols-outlined text-[18px]">visibility</span>', '<span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>')
    
    # Fix links
    header_jsx = re.sub(r'<a.*?data-path="login".*?>(.*?)</a>', r'<Link to="/login" className="font-label-md transition-colors text-on-surface">\1</Link>', header_jsx)
    header_jsx = re.sub(r'<a.*?data-path="register".*?>(.*?)</a>', r'<Link to="/register" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">\1</Link>', header_jsx)
    
    login_component = f"""import React, {{ useEffect, useState }} from 'react';
import {{ Link }} from 'react-router-dom';

const Login = () => {{
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {{
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const heroColumn = document.getElementById('left-hero-column');
    const card = document.getElementById('parallax-card');
    const wrapper = document.getElementById('artwork-wrapper');
    const cursorGlow = document.getElementById('cursor-glow');

    if (!heroColumn || !card) return;

    let targetRotateX = 0;
    let targetRotateY = 0;
    let targetTranslateX = 0;
    let targetTranslateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let currentTranslateX = 0;
    let currentTranslateY = 0;
    let isHovered = false;
    let animFrameId = null;

    function onMouseMove(e) {{
      const rect = heroColumn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = (y / rect.height) * 2 - 1;

      targetRotateX = -normalizedY * 11;
      targetRotateY = normalizedX * 13;
      targetTranslateX = normalizedX * 10;
      targetTranslateY = normalizedY * 8;

      if (cursorGlow) {{
        cursorGlow.style.left = `${{x - 240}}px`;
        cursorGlow.style.top = `${{y - 240}}px`;
        cursorGlow.style.opacity = '0.8';
      }}
    }}

    function onMouseEnter() {{
      isHovered = true;
      startAnimationLoop();
    }}

    function onMouseLeave() {{
      isHovered = false;
      targetRotateX = 0;
      targetRotateY = 0;
      targetTranslateX = 0;
      targetTranslateY = 0;
      if (cursorGlow) {{
        cursorGlow.style.opacity = '0.4';
      }}
    }}

    function lerp(start, end, factor) {{
      return start + (end - start) * factor;
    }}

    function renderLoop() {{
      currentRotateX = lerp(currentRotateX, targetRotateX, 0.08);
      currentRotateY = lerp(currentRotateY, targetRotateY, 0.08);
      currentTranslateX = lerp(currentTranslateX, targetTranslateX, 0.08);
      currentTranslateY = lerp(currentTranslateY, targetTranslateY, 0.08);

      card.style.transform = `rotateX(${{currentRotateX.toFixed(2)}}deg) rotateY(${{currentRotateY.toFixed(2)}}deg) translate3d(${{currentTranslateX.toFixed(2)}}px, ${{currentTranslateY.toFixed(2)}}px, 0)`;

      if (wrapper) {{
        const offsetX = currentRotateY * 0.9;
        const offsetY = -currentRotateX * 0.9;
        wrapper.style.transform = `translate3d(${{offsetX.toFixed(1)}}px, ${{offsetY.toFixed(1)}}px, 15px)`;
      }}

      const isSettled = !isHovered && 
        Math.abs(currentRotateX) < 0.02 && 
        Math.abs(currentRotateY) < 0.02 && 
        Math.abs(currentTranslateX) < 0.02 && 
        Math.abs(currentTranslateY) < 0.02;

      if (!isSettled) {{
        animFrameId = requestAnimationFrame(renderLoop);
      }} else {{
        card.style.transform = '';
        if (wrapper) wrapper.style.transform = '';
        animFrameId = null;
      }}
    }}

    function startAnimationLoop() {{
      if (!animFrameId) {{
        animFrameId = requestAnimationFrame(renderLoop);
      }}
    }}

    heroColumn.addEventListener('mousemove', (e) => {{
      onMouseMove(e);
      startAnimationLoop();
    }});
    heroColumn.addEventListener('mouseenter', onMouseEnter);
    heroColumn.addEventListener('mouseleave', onMouseLeave);

    return () => {{
      heroColumn.removeEventListener('mousemove', onMouseMove);
      heroColumn.removeEventListener('mouseenter', onMouseEnter);
      heroColumn.removeEventListener('mouseleave', onMouseLeave);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    }};
  }}, []);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen relative dark">
      {header_jsx}
      <main className="w-full min-h-screen bg-background relative flex flex-col justify-center">
        {login_jsx}
      </main>
    </div>
  );
}};

export default Login;
"""
    with open(r'd:\TeamManger\frontend\src\components\Login.js', 'w', encoding='utf-8') as f:
        f.write(login_component)

# Register parsing
with open(r'd:\TeamManger\frontend\temp_screens\register.html', 'r', encoding='utf-8') as f:
    register_html = f.read()

main_match_r = re.search(r'<main[^>]*>(.*?)</main>', register_html, re.DOTALL)
if main_match_r:
    register_main = main_match_r.group(1)
    register_jsx = convert_to_jsx(register_main)

    header_match_r = re.search(r'<header[^>]*>(.*?)</header>', register_html, re.DOTALL)
    header_jsx_r = convert_to_jsx(f'<header className="fixed top-0 left-0 w-full z-50 pointer-events-none p-margin">{header_match_r.group(1)}</header>') if header_match_r else ''

    # Fix links in header
    header_jsx_r = re.sub(r'<a.*?data-path="login".*?>(.*?)</a>', r'<Link to="/login" className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors">\1</Link>', header_jsx_r)
    header_jsx_r = re.sub(r'<a.*?data-path="register".*?>(.*?)</a>', r'<Link to="/register" className="font-label-md transition-colors text-on-surface">\1</Link>', header_jsx_r)
    
    register_jsx = register_jsx.replace('type="password"', 'type={showPassword ? "text" : "password"}')
    register_jsx = register_jsx.replace('id="togglePasswordBtn"', 'id="togglePasswordBtn" onClick={() => setShowPassword(!showPassword)}')
    register_jsx = register_jsx.replace('<span className="material-symbols-outlined text-[18px]">visibility</span>', '<span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>')
    register_jsx = register_jsx.replace('checked=""', 'defaultChecked')

    register_component = f"""import React, {{ useState }} from 'react';
import {{ Link }} from 'react-router-dom';

const Register = () => {{
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased selection:bg-primary selection:text-on-primary min-h-screen relative dark">
      {header_jsx_r}
      <main className="w-full min-h-screen bg-background relative flex flex-col justify-center">
        {register_jsx}
      </main>
    </div>
  );
}};

export default Register;
"""
    with open(r'd:\TeamManger\frontend\src\components\Register.js', 'w', encoding='utf-8') as f:
        f.write(register_component)

# CSS extraction
login_css = re.search(r'<style>(.*?)</style>', login_html, re.DOTALL)
register_css = re.search(r'<style>(.*?)</style>', register_html, re.DOTALL)

css_to_append = ""
if login_css:
    cleaned_login_css = login_css.group(1).replace('@layer base{\\n  html,body{margin:0;padding:0;}\\n  body{overscroll-behavior:none;}\\n  main>:first-child{margin-top:0!important;}\\n  main>:last-child{margin-bottom:0!important;}\\n}\\n::-webkit-scrollbar{display:none;}\\n', '')
    css_to_append += "\\n/* Login CSS */\\n" + cleaned_login_css

if register_css:
    cleaned_register_css = register_css.group(1).replace('@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}\\n::-webkit-scrollbar{display:none;}\\n', '')
    css_to_append += "\\n/* Register CSS */\\n" + cleaned_register_css

with open(r'd:\TeamManger\frontend\src\index.css', 'a', encoding='utf-8') as f:
    f.write(css_to_append)

print("Conversion completed successfully.")
