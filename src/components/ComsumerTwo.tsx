import React from 'react';
export const ConsumerTwo = ({ children }: {
    children?: React.ReactNode
}) => {
    return <div> "I'm a sub component 2"
        <div>
            {'res'}
            {children}
        </div></div>;
};
