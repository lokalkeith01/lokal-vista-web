

## Navigation Auth Button Swap

### Changes

**File: `src/components/Navbar.tsx`**

1. **Desktop navigation** (around lines 63-80):
   - Change "Sign In" from a `<Button>` to a `<Link>` styled like the other nav links (text-sm font-medium, text-blue, hover effects)
   - Add a new "Sign Up" `<Button>` with the current primary styling (`bg-primary hover:bg-primary/90`)
   - Show both Sign In (as link) and Sign Up (as button) when user is not logged in

2. **Mobile navigation** (around lines 110-120):
   - Apply the same pattern: Sign In as a regular menu link, Sign Up as the primary button

### Technical Details

Desktop (not logged in):
```text
[Home] [Discover] [Our Story] ... [Sign In]  [Sign Up Button]
                                   ^link        ^primary button
```

- "Sign In" becomes: `<Link to="/sign-in" className="text-sm font-medium text-blue hover:text-blue/80">Sign In</Link>`
- "Sign Up" becomes: `<Button onClick={() => navigate('/sign-up')} className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up</Button>`

Mobile follows the same pattern with Sign In as a regular menu item and Sign Up as the styled button at the bottom.

### Note
This aligns with the memory note about a unified auth entry point but updates it so Sign Up is the primary call-to-action while Sign In remains accessible as a standard link.
