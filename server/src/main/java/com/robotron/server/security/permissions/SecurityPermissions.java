package com.robotron.server.security.permissions;

public final class SecurityPermissions {

    private SecurityPermissions() {}

    public static final String PRODUCT_CREATE = "PRODUCT_CREATE";
    public static final String PRODUCT_EDIT = "PRODUCT_EDIT";
    public static final String PRODUCT_ARCHIVE = "PRODUCT_ARCHIVE";
    public static final String PRODUCT_DELETE = "PRODUCT_DELETE";
    public static final String PRODUCT_RESTORE = "PRODUCT_RESTORE";

    public static final String USER_BLOCK = "USER_BLOCK";
    public static final String USER_UNBLOCK = "USER_UNBLOCK";

    public static final String USER_CREATE = "USER_CREATE";
    public static final String USER_DELETE = "USER_DELETE";
    public static final String USER_ROLE_CHANGE = "USER_ROLE_CHANGE";

    public static final String CATEGORY_CREATE = "CATEGORY_CREATE";
    public static final String CATEGORY_EDIT = "CATEGORY_EDIT";
    public static final String CATEGORY_DELETE = "CATEGORY_DELETE";

    public static final String DEVICE_READ = "DEVICE_READ";
    public static final String DEVICE_CREATE = "DEVICE_CREATE";
    public static final String DEVICE_EDIT = "DEVICE_EDIT";
    public static final String DEVICE_ARCHIVE = "DEVICE_ARCHIVE";
    public static final String DEVICE_RESTORE = "DEVICE_RESTORE";
    public static final String DEVICE_DELETE = "DEVICE_DELETE";
}
