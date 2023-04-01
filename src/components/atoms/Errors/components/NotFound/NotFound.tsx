import React from 'react';

interface IProps {
    functionality: string;
}

const NotFound: React.FC<IProps> = ({ functionality }) => {
    return <p>Whoops! {functionality}.</p>;
};

export default NotFound;
