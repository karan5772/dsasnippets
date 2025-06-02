import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylistStore } from "../store/usePlaylistStore";
import CustomProblemTableForPlaylist from "../components/CustomProblemTableForPlaylist";

const PlaylistPage = () => {
  const { id } = useParams(); // Get playlist ID from URL
  const { getCustomPlaylistDetails, playlist, isLoading } = usePlaylistStore(); // Use playlist state from the store
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false); // State to track payment completion

  useEffect(() => {
    getCustomPlaylistDetails(id);
    const paymentStatus = localStorage.getItem(`payment_${id}`);
    if (paymentStatus === "completed") {
      setIsPaymentCompleted(true);
    }
  }, [id, getCustomPlaylistDetails]);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_c18NLQMMGkbEHB",
      amount: 50000,
      currency: "INR",
      name: "DSA Snippets",
      description: "Unlock the playlist to access premium problems",
      image: "/dsasnippets.svg",
      handler: function (response) {
        setIsPaymentCompleted(true);
        localStorage.setItem(`payment_${id}`, "completed");
      },
      prefill: {
        name: "Karan Choudhary",
        email: "karan123@dsasnippets.com",
        contact: "6350320901",
      },
      theme: {
        color: "#4a40f5",
        backdrop_color: "rgba(0, 0, 0, 0.6)",
      },
      modal: {
        backdropclose: true,
        escape: true,
        confirm_close: true,
      },
      notes: {
        playlistId: id,
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* Full-screen loading spinner */}
        <div className="flex flex-col items-center w-full">
          <span className="loading loading-dots loading-lg"></span>
          <p className="mt-4 text-4xl">Loading Playlist...</p>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="text-white text-lg">Playlist not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-14 px-4 text-white">
      {/* Background Glow */}
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary opacity-40 blur-3xl rounded-md"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-secondary opacity-40 blur-3xl rounded-md"></div>

      {/* Playlist Header */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 md:p-12 rounded-3xl shadow-lg w-full max-w-7xl lg:min-w-[700px]">
        <div className="flex items-center gap-6 mb-8 mt-10">
          <div></div>
          {/* Creator's Profile Photo */}
          <label tabIndex={0} className="btn-circle">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-4xl flex items-center justify-center font-bold ring ring-primary ring-offset-base-100 ring-offset-2 w-25 h-25 rounded-full shadow-lg">
              {playlist.user.name
                ? playlist.user.name
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")
                    .toUpperCase()
                : "U"}
            </div>
          </label>

          {/* Playlist Details */}
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">
              {playlist.name}
            </h1>
            <p className="text-gray-300 mt-4">{playlist.description}</p>
            <p className="text-gray-400 mt-2">
              Created by:{" "}
              <span className="text-white font-bold">{playlist.user.name}</span>
            </p>
          </div>
        </div>

        {/* Payment Button */}
        {!isPaymentCompleted && (
          <div className="text-center mb-6">
            <button
              onClick={handlePayment}
              className="btn btn-primary text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500"
            >
              Unlock Playlist for ₹500
            </button>
            <p className="text-gray-400 mt-2 text-sm">
              * This is a demo payment gateway
            </p>
          </div>
        )}

        {/* Problems Table */}
        <div
          className={`mt-8 transition-all duration-500 relative ${
            isPaymentCompleted
              ? "blur-0 pointer-events-auto"
              : "blur-md pointer-events-none"
          }`}
        >
          <CustomProblemTableForPlaylist problems={playlist.problems} />
        </div>

        {/* Payment Success Message */}
        {isPaymentCompleted && (
          <div className="mt-6 text-center">
            <p className="text-green-400 font-semibold text-lg">
              Congrats 🎉 <br />
              You now have access to the playlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
