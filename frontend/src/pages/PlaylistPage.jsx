import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePlaylistStore } from "../store/usePlaylistStore";
import CustomProblemTableForPlaylist from "../components/CustomProblemTableForPlaylist";

const PlaylistPage = () => {
  const { id } = useParams(); // Get playlist ID from URL
  const { getCustomPlaylistDetails, playlist, isLoading } = usePlaylistStore(); // Use playlist state from the store
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false); // State to track payment completion

  useEffect(() => {
    getCustomPlaylistDetails(id); // Fetch playlist data
  }, [id, getCustomPlaylistDetails]);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_c18NLQMMGkbEHB", // Razorpay test key
      amount: 50000,
      currency: "INR",
      name: "Demo Playlist Payment",
      description: "Unlock the playlist to access problems",
      handler: function (response) {
        // console.log("Payment successful:", response);
        setIsPaymentCompleted(true);
      },
      prefill: {
        name: "Karan Choudhary",
        email: "karan123@dsasnippets.com",
        contact: "6350320901",
      },
      theme: {
        color: "#6C63FF",
        backdrop_color: "#1a1a1a",
      },
      modal: {
        backdropclose: true,
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  if (isLoading || !playlist) {
    return (
      <div className="flex items-center justify-center w-full  p-10 h-96">
        {/* Full-screen loading spinner */}
        <div className="flex flex-col items-center w-full">
          <span className="loading loading-dots loading-xl"></span>
          <p className="mt-4 text-4xl">Loading Playlist...</p>
        </div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-white text-lg">Playlist not found</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 md:p-12 rounded-3xl shadow-lg">
        <div className="max-w-6xl mx-auto">
          {/* Playlist Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">
              {playlist.name}
            </h1>
            <p className="text-gray-300 mt-4">{playlist.description}</p>
            <p className="text-gray-400 mt-2">
              Created by:{" "}
              <span className="text-white font-bold">{playlist.user.name}</span>
            </p>
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
                Payment successful! You now have access to the playlist.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
