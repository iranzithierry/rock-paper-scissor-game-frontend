export interface GameType {
    id:        string;
    mode:      'Public' | 'Private';
    status:    'Open'   | 'Full';
    timestamp: Date;
}
