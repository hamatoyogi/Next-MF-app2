import React from 'react';
const AboutApp1 = (await import('app1/about')).default;

const AboutFromApp1 = () => {
    return (
        <AboutApp1/>
    )
}

export default AboutFromApp1