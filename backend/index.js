import app from "./app.js";
import Pitch from "./models/pitchSchema.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`🚀 Server listening on port ${PORT}`);

  const testPitch = {
    startupName: "Test Startup",
    startupType: "Product-based",
    pitch: "This is a test pitch for LaunchPad.",
    cost: "5000000",
    videoUrl: "https://example.com/demo",
    location: "Test City",
    mode: "Online",
  };

  try {
    const existing = await Pitch.findOne({
      startupName: testPitch.startupName,
    });
    if (!existing) {
      await Pitch.create(testPitch);
      console.log("✅ Test pitch inserted into database");
    } else {
      console.log("ℹ Test pitch already exists in database");
    }
  } catch (err) {
    console.error("❌ Failed to insert test pitch:", err);
  }
});
