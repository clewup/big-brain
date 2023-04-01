import React from 'react';

interface IProps {
    functionality: string;
}

const SignIn: React.FC<IProps> = ({ functionality }) => {
    return <p>Please sign in to {functionality}.</p>;
};

export default SignIn;
