export interface UserContextTypes {
    user: User | null;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkUser: () => Promise<void>;
}

export interface User {
    id: string,
    name: string,
    bio: string,
    image: string,
}

export interface Profile {
    id: string;
    user_id: string;
    name: string;
    image: string;
    bio: string;
}

export interface RandomUsers {
    id: string;
    name: string;
    image: string;
}

export interface CropperDimensions {
    height?: number | null;
    width?: number | null;
    left?: number | null;
    top?: number | null;
}

export interface Like {
    id: string;
    user_id: string;
    post_id: string;
  }

export interface Follow {
    follower_id: string;
    followed_id: string;
  }

export interface Post {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
}

export interface PostWithProfile {
    id: string;
    user_id: string;
    video_url: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    };
    is_ad: boolean;
    product_id: string
}

export interface CommentWithProfile {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
}

export interface ShowErrorObject {
    type: string;
    message: string;
}

export interface UploadError {
    type: string;
    message: string;
}

export interface Product {
    product_id: string,
    image: string,
    title: string,
    brand: string,
    rating: number,
    price : number,
    description: string,
    
}


//////////////////////////////////////////////
//////////////////////////////////////////////

// COMPONENT TYPES
export interface CommentsHeaderCompTypes {
    params: { userId: string; postId: string; };
    post: PostWithProfile
}

export interface CommentsCompTypes {
    params: { userId: string; postId: string; };
}

export interface PostPageTypes {
    params: { userId: string; postId: string; };
}

export interface ProfilePageTypes {
    params: { id: string; };
}

export interface SingleCommentCompTypes {
    params: { userId: string; postId: string; };
    comment: CommentWithProfile
}

export interface PostUserCompTypes {
    post: Post
}

export interface PostMainCompTypes {
    post: PostWithProfile
    ordKey: number
    callbackAfterScroll: (num : number) => void;
}

export interface PostMainLikesCompTypes {
    post: PostWithProfile
}

export interface TextInputCompTypes {
    string: string;
    inputType: string;
    placeholder: string;
    onUpdate: (newValue: string) => void;
    error: string;
}

export interface ProductPageTypes {
    params: { productId: string; };
}


//////////////////////////////////////////////
//////////////////////////////////////////////

// LAYOUT INCLUDE TYPES
export interface MenuItemTypes {
    iconString: string,
    colorString: string,
    sizeString: string
}

export interface MenuItemFollowCompTypes {
    user: RandomUsers
}