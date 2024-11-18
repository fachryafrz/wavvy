import "@/app/audio-wave.css";

export default function AudioWave({ className }) {
  return (
    <div class={`boxContainer ${className}`}>
      <div class="box box1"></div>
      <div class="box box2"></div>
      <div class="box box3"></div>
      <div class="box box4"></div>
      <div class="box box5"></div>
    </div>
  );
}
