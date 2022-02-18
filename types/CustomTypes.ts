



namespace customTypes{

export interface ExternalUrlObject {
    spotify: string;
}
export interface FollowersObject {
        /**
         * A link to the Web API endpoint providing full details of the followers; `null` if not available.
         * Please note that this will always be set to `null`, as the Web API does not support it at the moment.
         */
        href: null;
        /**
         * The total number of followers.
         */
        total: number;
}




export interface UserObjectPublic {
    display_name?: string | undefined;
    external_urls: ExternalUrlObject;
    followers?: FollowersObject | undefined;
    href: string;
    id: string;
    images?: ImageObject[] | undefined;
    type: string;
    uri: string;
}
export interface ImageObject {
    /**
     * The image height in pixels. If unknown: `null` or not returned.
     */
    height?: number | undefined | null;
    /**
     * The source URL of the image.
     */
    url: string;
    /**
     * The image width in pixels. If unknown: null or not returned.
     */
    width?: number | undefined | null;
}
export interface ContextObject {
    /**
     * The object type.
     */
    // type: "artist" | "playlist" | "album" | "show" | "episode";
    /**
     * A link to the Web API endpoint providing full details.
     */
    href: string;
    /**
     * Known external URLs.
     */
    external_urls: ExternalUrlObject;
    /**
     * The [Spotify URI](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids).
     */
    uri: string;
}
export interface PlaylistBaseObject extends ContextObject {
    /**
     * Returns `true` if context is not search and the owner allows other users to modify the playlist.
     * Otherwise returns `false`.
     */
    collaborative: boolean;
    /**
     * The playlist description. Only returned for modified, verified playlists, otherwise null.
     */
    description: string | null;
    /**
     * The [Spotify ID](https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids) for the playlist.
     */
    id: string;
    /**
     * Images for the playlist. The array may be empty or contain up to three images.
     * The images are returned by size in descending order.
     * See [Working with Playlists](https://developer.spotify.com/documentation/general/guides/working-with-playlists/).
     * Note: If returned, the source URL for the image (`url`) is temporary and will expire in less than a day.
     */
    images: ImageObject[];
    /**
     * The name of the playlist.
     */
    name: string;
    /**
     * The user who owns the playlist.
     */
    owner: UserObjectPublic;
    /**
     * The playlist’s public/private status:
     * `true` the playlist is public,
     * `false` the playlist is private,
     * or `null` the playlist status is not relevant.
     */
    public: boolean | null;
    /**
     * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version:
     * see [Remove tracks from a playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/).
     */
    snapshot_id: string;
    type: string;
}

export interface PlaylistObjectSimplified extends PlaylistBaseObject {
    tracks: {
        href: string;
        total: number;
    };
}

export interface PagingObject<T> {
    href: string;
    items: T[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface ListOfCurrentUsersPlaylistsResponse extends PagingObject<PlaylistObjectSimplified> {}

}
export default customTypes;