import React from 'react';

export const Container = ({ children }: {
    children?: React.ReactNode
}) => {
    return <div> "I'm a sub component"
        <div>
            {children}
        </div></div>;
}
