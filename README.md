# Musicorator

A desktop application built with Electron and Angular for efficient music organization through customizable tagging. Tag your music quickly, create playlists based on tags, and preview files seamlessly while organizing your collection.

## Key Features

- **Quick Tagging**: Rapidly assign tags with automatic group switching for efficient workflow
- **Custom Tag Groups**: Create personalized tag categories like "speed" (fast, slow) or "mood" (energetic, calm)
- **File Preview**: Open files directly in your default OS application while tagging
- **Playlist Generation**: Create playlists based on tag combinations
- **Data Export**: Export your tagged music lists to CSV format

## Example usage

- **Quick Tagging**:
  ![tagging](/showcase-images/musicorator-tagging.gif)

- **Quick Tagging With Extra**:
  ![tagging-extra](/showcase-images/musicorator-tagging-extra.gif)

- **Finding types and creating playlist**:
  ![finding-moving](/showcase-images/musicorator-finding-moving.gif)

- **Searching**:
  ![searching](/showcase-images/musicorator-searching.gif)

- **Sorting**:
  ![sorting](/showcase-images/musicorator-sorting.gif)

- **Customizing tags**:
  ![tag-management](/showcase-images/musicorator-tag-management.gif)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd musicorator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run electron
   ```

## How to Use

1. **Set Up Tags**:

   - Create custom tag groups (e.g., speed, mood)
   - Define tags within each group

2. **Tag Your Music**:

   - Open a music directory
   - Select tags from your defined groups
   - Preview files by clicking to open in default player
   - App automatically switches to next tag group for faster workflow

3. **Create Playlists**:
   - Filter music by tags
   - Generate playlists based on your selections
   - Export to CSV for use in other applications

## Technical Stack

- **Frontend**: Angular
- **Desktop Framework**: Electron
- **File Handling**: Native OS integration for file previews
- **Future Storage**: SQL-based (planned)

## Future Development

- Directory-based tagging using SQL
- Support for other media types (images, documents)
- Advanced tag combination filtering
- Additional tagging categories for different media types

## License

MIT License

---

**Note**: This is a development version. Future updates will introduce SQL-based storage and expanded media type support.
