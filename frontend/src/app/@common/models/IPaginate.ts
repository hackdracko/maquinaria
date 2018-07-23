export interface IPaginate<T> {
    /**
     * Current Page
     */
    current_page?: number;
    /**
     * A list of items
     */
    data?: T[];
    /**
     * From Page
     */
    from?: number;
    /**
     * Last Page
     */
    last_page?: number;
    /**
     * Next Page
     */
    next_page_url?: any;
    /**
     * Path
     */
    path?: string;
    /**
     * Items per Page
     */
    per_page?: number;
    /**
     * Previous Page
     */
    prev_page_url?: any;
    /**
     * To Page
     */
    to?: number;
    /**
     * Total count of items
     */
    total?: number;
}