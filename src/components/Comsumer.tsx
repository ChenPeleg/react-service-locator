import React from 'react';

export const Consumer = ({ children }: {
    children?: React.ReactNode
}) => {
    return <div> "I'm a sub component"
        <div>
            {children}
        </div></div>;
};
