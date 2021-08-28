import React from 'react';
import "./camera.scss";

interface Props {
    username: string,
    name: string
}

export const CameraTemplate = ({ username, name }: Props) => {
    return (
        <div className="camera-template">
            <div className="identity">
                <div className="name">{name}</div>
                <div className="username">{username}</div>
            </div>
        </div>
    )
}