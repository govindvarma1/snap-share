'use client'
import React from "react"

export default function NavBarModalTriggers() {
    const [showCreateRoom, setShowCreateRoom] = React.useState(false);
    const [showJoinRoom, setShowJoinRoom] = React.useState(false);
    return (
        <div className="flex gap-2">
            <button className="font-bold hover:bg-gray-100 p-1 rounded-md">Create Room</button>
            <button className="font-bold hover:bg-gray-100 p-1 rounded-md">Join Room</button>
        </div>
    )
}