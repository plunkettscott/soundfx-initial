
type SoundMode = 'Frontend' | 'Spatial' | 'Legacy'

interface PlaySoundData {
    mode: SoundMode
    resource: string
    sound: string
    volume?: number
}